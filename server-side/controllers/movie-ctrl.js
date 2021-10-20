const Movie = require('../models/movie-model')
const User = require("../models/user-models");

setRatting = (req, res) => {
    const body = req.body

    // body = {title,imdbid,ratting,userid,imdbvotes,imdbratting}
    console.log(body);
    const imdbvotes = parseInt(body.imdbvotes.replace(/,/g, ''));
    const ratting = parseInt(body.ratting);
    const imdbratting = parseFloat(body.imdbratting);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide movie data+ratting!!',
        })
    }
    Movie.findOne({ imdbid: body.imdbid }, (err, movie) => {
        if (!movie)// it means movie is not in database so add it to database.
        {
            console.log(body);
            const mov = new Movie();
            mov.title = body.title;
            mov.imdbid = body.imdbid;
            mov.ratecount = imdbvotes + 1;
            mov.totalratesum = parseInt(imdbratting * imdbvotes, 10) + parseInt(ratting);
            mov.avgratting = mov.totalratesum / mov.ratecount;
            mov.save().then(() => {
                User.findOne({ _id: body.userid }, (err1, user) => {
                user.ratedmovie.push(body.imdbid)
                user.userratting.push({ "movieid": mov._id, "ratting": ratting, "imdbid": body.imdbid })
                user.save().then(() => {
                    return res.status(200).json({
                        success: true,
                        avgratting: mov.avgratting,
                        message: 'Movie successfully ratted!!',
                        user:user,
                    })
                })
                    .catch(error => {
                        return res.status(404).json({
                            error,
                            message: 'Movie created in database but userratting could not be updated!!',
                        })
                    })
                }
            )
            })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'Movie could not be created somthing went wrong!!',
                    })
                })
        }
        else 
        {
            User.findOne({ _id: body.userid }, (err1, user) => {
                if (err1) {
                    return res.status(404).json({
                        error,
                        message: 'Something went wrong! user not found!!',
                    })
                }
                if (user.ratedmovie.includes(body.imdbid)) {
                    const index = user.userratting.findIndex(element => element.imdbid === body.imdbid);
                    const oldrating = user.userratting[index].ratting;
                    user.userratting[index].ratting = parseInt(ratting);
                    user.markModified('userratting');

                    user.save().then(() => {
                        movie.totalratesum += (parseInt(ratting) - oldrating);
                        movie.avgratting = movie.totalratesum / movie.ratecount;
                        console.log(movie);
                        movie.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                avgratting: movie.avgratting,
                                message: 'Movie rating successfully updated!!',
                                user:user,
                            })
                        })
                        .catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'user rating updated but movie rating data can not be updated!!',
                            })
                        })
                    })
                        .catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'Can not update use rating!!',
                            })
                        });
                }
                else {
                    user.ratedmovie.push(body.imdbid)
                    user.userratting.push({ "ratting": ratting, "imdbid": body.imdbid })
                    user.save().then(() => {
                        movie.totalratesum += parseInt(ratting)
                        movie.ratecount++;
                        movie.avgratting = movie.totalratesum / movie.ratecount;
                        movie.save().then(() => {
                            return res.status(200).json({
                                success: true,
                                avgratting: movie.avgratting,
                                newtotalrating:movie.totalratesum,
                                message: 'Movie successfully ratted!!',
                                user:user,
                            })
                        })
                    })
                        .catch(error => {
                            return res.status(404).json({
                                error,
                                message: 'user rating updated bou movie rating data not be updated!',
                            })
                        })
                }
            })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'user not found! Movie could not be updated somthing went wrong!!',
                    })
                })
        }
    })
}

module.exports = {
    setRatting
}