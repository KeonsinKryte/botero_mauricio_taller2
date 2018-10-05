var content = [
    {
        imgCover: "./sources/images/Vinyls/I.Vinyl - Cover (1).png",
        imgLP: "./sources/images/Vinyls/I.Vinyl - Green Day.png",
        link: "6AFJIZmd1zWQDBBwHyeo9w",
    },
    {
        imgCover: "./sources/images/Vinyls/I.Vinyl - Cover (2).png",
        imgLP: "./sources/images/Vinyls/I.Vinyl - Coldplay.png",
        link: "3cfAM8b8KqJRoIzt3zLKqw",
    },
    {
        imgCover: "./sources/images/Vinyls/I.Vinyl - Cover (3).png",
        imgLP: "./sources/images/Vinyls/I.Vinyl - Gorillaz.png",
        link: "0NvirtaDCaZU5PAW1O5FDE",
    }
]

function objToHtml(obj) {
    return `<article class="chunk__vinyl">
                <img class="vinyl__cover" src="${obj.imgCover}" alt="Cover">
                <img class="vinyl__lp" src="${obj.imgLP}" alt="LP">
                <iframe class="vinyl__player" src="https://open.spotify.com/embed/album/${obj.link}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        </article>`;
}

for (var i = 0; i < content.length; i++) {
    document.querySelector(".chunk__content").innerHTML += objToHtml(content[i]);
    console.log(i);
}

var looper;
var degrees = 0;
function rotateAnimation(carousel, speed) {
    var elem = document.getElementById("carousel");

    elem.style.transform = "rotate(" + degrees + "deg)";
    elem.style.transformOrigin = "transform-origin: 50% 50% 0px";

    looper = setTimeout('rotateAnimation(\'' + carousel + '\',' + speed + ')', speed);
    degrees += 60;
    document.getElementById("status").innerHTML = `rotate(${degrees}deg)`;
}

rotateAnimation(document.getElementById("carousel"), 2500);