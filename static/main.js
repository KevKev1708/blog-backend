//holt die Daten von dem Server mit dem Endpunkt "/blogs" "http://localhost:8080/blogs" und formatiert sie zu JSON und ruft dann die
//Funktion buildPosts auf
fetch('http://localhost:8080/blogs')
    .then(response => response.json())
    .then(buildPosts)
//Funktion geht durch alle Daten und erstellt für jeden Post einen div-Container, h2 und p-Container und schreibt dort
//die Daten rein
function buildPosts(posts) {
    posts.forEach(post => {
        let div = document.createElement("div");
        div.classList.add("post");
        let h2 = document.createElement("h2");
        h2.innerHTML = post.title;
        div.appendChild(h2);
        let p = document.createElement("p");
        p.innerHTML = post.body;
        div.appendChild(p);
        //hier wird der erstellte div-Bereich an den schon bestehenden div-Bereich angeschoben
        document.getElementById('posts').prepend(div)

        console.log(div);
        console.log(p);
    })
};