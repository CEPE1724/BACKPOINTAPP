exports.isGeneral = (req, res, next) => {
    if( req.user.role == 'admin' || req.user.role == 'user'|| req.user.role == 'administrativo' || req.user.role == 'rrhh'|| req.user.role == 'ventas' ){
        return next();
    } else{
        return res.status(401).json({message: 'Unauthorized 1',  role: req.user.role})
    }
}

exports.isAdmin = (req, res, next) => {
    if( req.user &&  req.user.role == 'admin' ){
        return next();
    } else{
        return res.status(401).json({message: 'Unauthorized 1',  role: req.user.role})
    }
} 

exports.isVentas_RRHH = (req, res, next) => {
    if( req.user && req.user.role === 'ventas' || req.user &&  req.user.role === 'rrhh' || req.user &&  req.user.role === 'administrativo'  || req.user &&  req.user.role === 'admin' ){
        return next();
    } else{
        return res.status(401).json({message: 'Unauthorized 1',  role: req.user.role})
    }
}


exports.isUser = (req, res, next) => {
    if (req.user && req.user.role === 'user') {
        console.log('User role:', req.user ? req.user.role : 'no user');
        return next();
    } else {
        return res.status(401).json({ message: 'Unauthorized', role: req.user ? req.user.role : 'no role' });
    }
}  

