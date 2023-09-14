//console.log('Script Bağlantı')

const container = document.querySelector(".container");
//console.log(container)
const count = document.getElementById("count");
//console.log(count)
const amount = document.getElementById("amount");
//console.log(amount)
const movieList = document.querySelector("#movie");
//console.log(movieList)
const infoText = document.querySelector(".infoText");
//console.log(infoText)
const seats = document.querySelectorAll(".seat:not(.reserved)");
//console.log(seats)

//Veritabanı Fonksiyonu

const saveSeatsToDatabase = (seatIndex) => {
  //console.log(seatIndex)

  //tarayıcı localstorage için Veritabanı kayıt için setItem kullnaılır

  //Koltukların Verisi kaydetme
  localStorage.setItem("seatsIndex", JSON.stringify(seatIndex));

  //Film verisi kaydı

  localStorage.setItem("movieIndex", JSON.stringify(movieList.selectedIndex));
};

const getSeatsFromDatabase = () => {
  //veritabnındaki index Bilgisini alıyoz

  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));
  //console.log(dbSelectedSeats)
  if (dbSelectedSeats !== null && dbSelectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  movieList.selectedIndex = dbSelectedMovie;
};

getSeatsFromDatabase();

//Koltukların index verilerini tespit etme fonksiyonu
const createSeatsIndex = () => {
  //Önce Tüm Boş Koltukların Olduğu Dizi Tanımlıyoruz

  const allSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });
  //console.log(allSeatsArray)

  //Seçili Koltuklardan Olulşacak Diziyi tanımlıyoruz

  const allSelectedSeatsArray = [];

  const allSelectedSeats = container.querySelectorAll(".seat.selected");
  allSelectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });

  //console.log(allSelectedSeatsArray)

  //Seçili Koltuğun İndeksini bulma
  const selectedSeatsIndexs = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
  });
  //console.log(selectedSeatsIndexs)
  saveSeatsToDatabase(selectedSeatsIndexs);
};
//Hesablama Fonksiyonu
const calculateTotal = () => {
  createSeatsIndex();
  //=====Hesablama İşlemler=====//

  //Toplam Seçili Koltuk Sayısı
  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;
  //console.log(selectedSeatsCount)

  //Toplam Seçili Koltuk Sayısını HTML e gönderme
  count.innerText = selectedSeatsCount;
  //Toplam Fiyatı HTML e Gönderme
  amount.innerText = selectedSeatsCount * movieList.value;

  //Bilgi yazısının görünürlük kontrolü
  if (selectedSeatsCount) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
};
calculateTotal();

//koltuğu tespit etmek için koltukların kapsayıcısı olan yapıdaki tıklama olayını dinliyoruz
container.addEventListener("click", (mouseEvent) => {
  //Tıklama Eventiyle Koltuk tespiti
  //console.log(mouseEvent.target.offsetParent)
  const clickedSeat = mouseEvent.target.offsetParent;
  //console.log(clickedSeat)

  if (
    //seat classını içersin
    clickedSeat.classList.contains("seat") &&
    //ve
    //reserved classını içermesin
    !clickedSeat.classList.contains("reserved")
  ) {
    //koltuğa selected clasını ekle çıkar işlemi
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});

movieList.addEventListener("change", () => {
  //console.log(movieList.value)

  calculateTotal();
});
