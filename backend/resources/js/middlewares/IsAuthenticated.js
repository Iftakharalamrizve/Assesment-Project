const IsAuthenticated=(to,from,next)=>{
    if(!store.getters.isLoggedIn){
        next('/login');
    }
    next();
}

export default IsAuthenticated;
