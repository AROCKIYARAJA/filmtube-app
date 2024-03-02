const useGenres = (selectedGenres) => {
    if(selectedGenres.length < 1){
        return "";
    }
    const GenresIds = selectedGenres.map((target) => target.id);
    return GenresIds.reduce((a,b) => a+","+b)
}

export default useGenres;