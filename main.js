const input=document.getElementById('input');
const arrow=document.getElementById('arrow');
const list=document.querySelectorAll('.info');





const map = L.map("map").setView([51.505, -0.09], 13);
const tileLayer='https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution={
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}
const firstTile=L.tileLayer(tileLayer,attribution);
firstTile.addTo(map);
let marker;

function sendRe() {
    let inputValue = input.value
    fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_kNbDCZBbDHD6Uyd6YUFTNcHz5tWUL&ipAddress=${inputValue}`)
        .then((response) => response.json())
        .then((responseData) => {
            if (responseData.code == 422) {
                alert(responseData.messages)
            } else {
                list[0].innerText = responseData.ip
                list[1].innerText = responseData.location.city + " " + responseData.location.region + " " + responseData.location.country
                list[2].innerText = responseData.location.timezone
                list[3].innerText = responseData.isp
            }
            map.flyTo([responseData.location.lat,responseData.location.lng],13)
            if(marker!==null){
                map.removeLayer(marker)
            }
            marker=L.marker([responseData.location.lat,responseData.location.lng])
            marker.addTo(map)
            marker.bindPopup(responseData.location.city + " " + responseData.location.region + " " + responseData.location.country).openPopup()
            marker.addEventListener("click",()=>{
                map.flyTo([responseData.location.lat,responseData.location.lng],13)
            })
        })


}
arrow.addEventListener("click", () => {
    sendRe()
})
document.addEventListener("keypress", (e) => {

    if (e.key == "Enter") {
        sendRe()
    }
})
sendRe()