const resultMessage=document.getElementById("resultMessage");

async function getBonus(collector){

    try{

        const collect = await fetch('/API/user/bonus', {
            method: 'PUT',
            body: JSON.stringify({
                id: collector,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (collect.status==200) {
            collect.json().then(data => {
                console.log(data);
                resultMessage.innerText=data.message

                setTimeout(()=>{
                    document.location.replace('/dashboard');
                },2000)

            })
        }else{
            resultMessage.innerText="there seems to be a little problem "
        }

    }
    catch{

        resultMessage.innerText="there seems to be a big problem "
    }

}

// ******************** For BG Image Change**************************//
function handleBG() {
    console.log("this worked")

    const castle = document.querySelector('#castle');
    castle.removeAttribute("class", "bannerC");


    const body = document.querySelector('body')
    body.removeAttribute("class", "bannerA");
    body.setAttribute("class", "bannerB");
    
}

handleBG();



