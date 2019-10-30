//holt die Daten von dem Server mit dem Endpunkt "/blogs" "http://localhost:8080/blogs" und formatiert sie zu JSON und ruft dann die
//Funktion buildPosts auf
fetch('http://localhost:8080/blogs')
    .then(response => response.json())
    .then(buildPosts)
//Funktion geht durch alle Daten und erstellt für jeden Post einen div-Container, h2 und p-Container und schreibt dort
//die Daten rein
function buildPosts(posts) {
    posts.forEach(post => {
        let div = document.createElement("li");
        let h6 = document.createElement("h6");
        h6.classList.add("collapsible-header");
        h6.innerHTML = post.title;
        div.appendChild(h6);
        let icon = document.createElement("i");
        icon.classList.add("material-icons");
        icon.innerHTML = "textsms";
        h6.prepend(icon);
        let p = document.createElement("p");
        p.classList.add("collapsible-body");
        p.innerHTML = post.body;
        div.appendChild(p);
        //hier wird der erstellte div-Bereich an den schon bestehenden div-Bereich angeschoben
        document.getElementById('posts').prepend(div)
    })
};

document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems);

});