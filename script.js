fetch("http://localhost:3000/jokes", {
    method: "get",
}).then((res) => res.json()).then(data => {
    document.querySelector(".container").innerHTML = data.map((joke, index) => {
        return `
        <div class="joke">
                <div class="content">
                    ${joke.content}
                </div>
                <div class="bar">
                    <div class="likeCount">${joke.likes}</div>
                    <button class="like" onclick="like(${index})"><i class="fa-solid fa-thumbs-up"></i></button>
                    <div class="dislikeCount">${joke.dislikes}</div>
                    <button class="dislike" onclick="dislike(${index})"><i class="fa-solid fa-thumbs-down"></i></button>
                </div>
            </div>
            `
    }).join("")
})

document.querySelector(".form button").addEventListener("click", function () {
    let input = document.querySelector(".form input")
    let content = input.value
    if (content.lenth < 1) return;
    fetch("http://localhost:3000/jokes", {
        method: "post",//add new joke
        body: JSON.stringify({ content })
    }).then(res => res.ok).then(res => {
        if (res) location.reload()
    })
})

function like(id) {
    fetch("http://localhost:3000/like?id=" + id, {
        method: "get",
    }).then(res => res.ok).then(res => {
        if (res) location.reload()
    })
}

function dislike(id) {
    fetch("http://localhost:3000/dislike?id=" + id, {
        method: "get",
    }).then(res => res.ok).then(res => {
        if (res) location.reload()
    })
}