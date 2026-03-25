let x = 0;
function trocarImagem(){
    let uno = document.getElementById("uno");
    uno.classList.add("arredondar");

    if (x == 0) {
        uno.setAttribute("src", "https://stickerly.pstatic.net/sticker_pack/hPDUcp28YU5A1yV3bzw/3F3MTK/13/324d9352-0faf-4605-ba5f-b76b0f354979.png");
        x = 1;
    }else if (x == 1) {
        uno.setAttribute("src", "https://pbs.twimg.com/media/E7K1ocAXsAMPGSC.jpg");
        x = 2;
    }else if (x == 2) {
        uno.setAttribute("src", "https://cdn2.cdnstep.com/OjA0PiLlHun2rHQ4xYkN/6.webp");
        x = 3;
    }else if (x == 3) {
        uno.setAttribute("src", "https://pbs.twimg.com/profile_images/1613579362728644613/nSTx0l3u_400x400.jpg");
        x = 0;
    }

}
