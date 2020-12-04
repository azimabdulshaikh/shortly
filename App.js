const form = document.getElementById("form")
const table = document.getElementsByClassName("table")
const container = document.querySelector('.container')


// function to copy link to clipboard
function copy_function(id){
    var value = document.getElementById(id).innerHTML;
    var input_temp = document.createElement("input");
    var btn = document.getElementById("btn-copy")
    input_temp.value = value;
    document.body.appendChild(input_temp);
    input_temp.select();
    document.execCommand("copy");
    document.body.removeChild(input_temp);
    btn.innerHTML = "Copied!";
};
    
// funtion to render error
const renderError = function(msg){
    
    form.insertAdjacentText('afterend',msg)
}


    form.addEventListener("submit",function(e){
        // Prevent auto click
        e.preventDefault()

        var link = document.getElementById("fullUrl").value
        
        fetch(`https://api.shrtco.de/v2/shorten?url=${link}`)
            .then(res=>{
                if(!res.ok){
                    throw new Error(`no url parameter set.`);

                }
              return  res.json()
            })
            .then(data=>{
                const html =  `
                <div class="table-responsive">
                    <table class="table table-striped">
                        <tbody>
                            <tr>
                                <td class="input-link"><a href="%link%">%link%</a></td>
                                <td class="short-link" ><a href="%data.result.short_link%" id=link-copy>%data.result.short_link%</a></td>
                                <td class="full-short-link"><a href="%data.result.full_short_link%">%data.result.full_short_link%</a></td>
                                <td class="short-link-2"><a href="%data.result.short_link2%">%data.result.short_link2%</a></td>
                                <td class="full-short-link-2"><a href="%data.result.full_short_link2%">%data.result.full_short_link2%</a></td>
                                <td><button class="btn btn-success" type="copy" id="btn-copy" onclick="copy_function('link-copy')">Copy</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>`
    
             newHtml = html.replaceAll('%link%',link)
             newHtml = newHtml.replaceAll('%data.result.short_link%',data.result.short_link)
             newHtml = newHtml.replaceAll('%data.result.full_short_link%',data.result.full_short_link)
             newHtml = newHtml.replaceAll('%data.result.short_link2%',data.result.short_link2)
             newHtml = newHtml.replaceAll('%data.result.full_short_link2%',data.result.full_short_link2)
             container.insertAdjacentHTML('beforeend',newHtml)
            })
            .catch(err=>{
                console.error(`${err}`)
                renderError(`Something went missing, ${err.message}`)
            })
    })



