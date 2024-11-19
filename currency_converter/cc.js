let container = document.getElementById("container");
let dropdown = document.querySelectorAll(".selectdropdown");
let inputfield = document.querySelector("#foramountinput");
let submitbutton = document.querySelector("#submitbtn");
let imgfrom = document.querySelector("#imgfrom");
let imgto = document.querySelector("#imgto");
let exchangeicon = document.querySelector("#exchangeicon");
let selectto = document.querySelector("#selectto");
let selectfrom = document.querySelector("#selectfrom");
let currencyvalue=document.querySelector("#currency_value");

let Baseurl="enter-your-base-url-here";                //CUSTOMIZE - THIS - PART.

const calculate=async()=>{
    let inputamount=inputfield.value;
    if (inputamount<0 || inputamount==""){
        inputfield.value=0;}
    const tofetchfrom = `enter-your-full-url-here`;    //CUSTOMIZE -THIS -PART(use-selectfrom.value-for accesing the value of dropdown from currencyANDuse-selectto.value-for accesing the value of drop down currency.)
    console.log("getting data...")
    let data = await fetch(tofetchfrom);
    console.log("converting..")
    let finalconversion=await data.json();
    let rate=finalconversion["enter-the-data-path-to-be-accesed-as-a-value-of-key-value-pair-(finalconverion -in this case)"];  //CUSTOMIZE THIS PART - AND DONE!
    let convertedamount=inputamount*rate;
    currencyvalue.innerText=`${selectfrom.value} ${inputamount}=${convertedamount} ${selectto.value}`
};

   const Flagchange = (event) => {
    let currency = event.value//currency
    let country = countryList[currency]//country name
    let newsrc = `https://flagsapi.com/${country}/flat/64.png`;
    let eventid = event.id;

    if (eventid.includes("from")) {
        imgfrom.src = newsrc;
    }
    else {
        imgto.src = newsrc;
    }
    
    if(selectto.value==selectfrom.value){
        alert("BOTH CURRENCY'S ARE SAME!!");
    }

}

for (let select of dropdown) {
    for (let currencycode in countryList) {
        let newelement = document.createElement("option");
        newelement.innerText = currencycode;
        newelement.value = currencycode;
        select.append(newelement);
    }
    let selectedid = select.id;

    if (selectedid.includes("from")) {
        selectfrom.value = "USD";
    }
    else {
        selectto.value = "INR";
    }

    select.addEventListener("change", (evt) => {
        Flagchange(evt.target)
    })

}



exchangeicon.addEventListener("click", () => { Exchanger() });
const Exchanger = () => {
    //exchange flag icon
    let imageforsource = imgto.src;
    let imageforto = imgfrom.src;
    imgfrom.src = imageforsource;
    imgto.src = imageforto;

    //exchange currency
    let valueforfrom = selectto.value;
    let valueforto = selectfrom.value;
    selectfrom.value = valueforfrom;
    selectto.value = valueforto;
}


// SUBMIT BUTTON CODE STARTS HERE:-

submitbutton.addEventListener("click",(evt)=>{
        evt.preventDefault();
        calculate();
    });