const form =document.querySelector(".top-banner")
const input =document.querySelector(".top-banner input")

//.class1.class2 vs. .class1 .class2
const msgSpan = document.querySelector(".container .msg")
const coinList = document.querySelector(".ajax-section .container .coins")

//localStorage apiKey yi kriptolu şekilde kaydettik
localStorage.setItem("apiKey",EncryptStringAES ("e0ea570367mshfc78c01050ccf49p13d66ejsn7e8a5405e2f7"))

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    getCoinDataFormApi()
    //form.reset == e.target.reset
    e.target.reset()
    
    
})

const getCoinDataFormApi =async ()=>{
    // alert("get coin")
    const apiKey =DecryptStringAES(localStorage.getItem("apiKey")) ;
    // console.log(apiKey);
    //  ${input.value} bu şekilde kullanımın adı template literal dir.
    const url = `https://coinranking1.p.rapidapi.com/coins?search=${input.value}&limit=1`

    const options = {
        method: 'GET',
        url: url,
        params: {
          referenceCurrencyUuid: 'yhjMzLPhuIDl',
          limit: '1',
          offset: '0',
          orderBy: '24hVolume',
          orderDirection: 'desc'
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
        }
    }
    //fetch vs axios

    // const response=await fetch(url,options)
    // .then((response) => response.json())
    // .then((result) =>console.log(result.data.coins[0]))

    try {
        const response = await axios(url,options)
    // console.log(response.data.data.coins[0]);
    //obj. destruction ile verileri almak için aşağıdaki kod yazıldı.
    // console.log(response);
    const {price,name,change,iconUrl,symbol} = response.data.data.coins[0]
    // console.log(name);

    //coin Control !!
    const coinNameSpans = coinList.querySelectorAll("h2 span");
    //filter vs map(array)
    if (coinNameSpans.length > 0) {
        const filteredArray = [...coinNameSpans].filter(span => span.innerText == name);
        // console.log(filteredArray);
        if (filteredArray.length > 0) {
            msgSpan.innerText = `You already know the data for ${name}, Please search for another coin 😉`;
            setTimeout(() => {
                msgSpan.innerText = "";
            }, 3000);
            return;
        }
    }

    const createdLi = document.createElement("li")
    createdLi.classList.add("coin");
    createdLi.innerHTML = `
    <h2 class="coin-name" data-name=${name}>
                <span>${name}</span>
                <sup>${symbol}</sup>
            </h2>
            <div class="coin-temp">$${Number(price).toFixed(6)}</div>
            <figure>
                <img class="coin-icon" src="">                
                <figcaption style='color:${change < 0 ? "red" : "green"}'>
                    <span><i class="fa-solid fa-chart-line"></i></span>
                    <span>${change}%</span>
                </figcaption>
            </figure>
            <span class="remove-icon">
                <i class="fas fa-window-close" style="color:red"></i>
            </span>
    
    `
    //append vs. prepend
    coinList.append(createdLi)

    //remove funct
    createdLi.querySelector(".remove-icon").addEventListener("click", ()=>{
        createdLi.remove()

    })

    }
    catch(error) {
       
    msgSpan.innerText = `Coin not found!`;
    setTimeout(() => {
        msgSpan.innerText = "";
    }, 3000);


    }

    
}