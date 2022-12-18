const idList = [ "take", "publish", "share", "like" ];
let last = "take";
setInterval(() => {
    document.getElementById(last).classList.add("hidden");
    last = idList[idList.indexOf(last)+1];
    if(!last) last = "take";
    document.getElementById(last).classList.remove("hidden");
}, 2580)