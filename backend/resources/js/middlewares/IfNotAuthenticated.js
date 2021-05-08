const IfNotAuthenticated=(to,from,next)=>{
    if(store.getters.isLoggedIn){
        next('/');
    }
    next();
}

export default IfNotAuthenticated;
