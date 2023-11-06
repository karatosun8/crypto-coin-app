const form =document.querySelector(".top-banner")
const input =document.querySelector(".top-banner input")

//.class1.class2 vs. .class1 .class2
const msgSpan = document.querySelector(".container .msg")
const coinList = document.querySelector(".ajax-section .container .coins")

//localStorage apiKey yi kriptolu şekilde kaydettik
localStorage.setItem("apiKey",EncryptStringAES ("v5yeugxst5624jx5_skggpuqw6rhipbil"))

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    getCoinDataFormApi()
    //form.reset == e.target.reset
    e.target.reset()
    
    
})

const getCoinDataFormApi =()=>{
    alert("get coin")
}