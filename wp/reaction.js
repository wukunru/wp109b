let bg_change=false;
let btn_show=false;
let game_stop=false;
let time_start=0;
let bg_ori= '#2d5959';
let high_score=[];

function background_change(){
    if(bg_change===false){
        let color_arr=[]
        for(let i=0; i<3; i++){
            let random= math.random()*150;
            color_arr.push(random);
        }
        document.querySelector("body").style.backgroundColor=`rgb(${color_arr[0]},${color_arr[1]},${color_arr[2]})`
        bg_change=true;
        time_start=new Date();
    }
}
function background_remove(){
    if(bg_change===true){
        document.querySelector("body").style.backgroundColor=bg_ori;
        bg_change=false;
    }
}
function show_btn(){
    if(btn_show===false){
        document.querySelector(".again").classList.remove("again_hide");
        btn_show=true;
        game_stop=true;
    }
}
function hide_btn(){
    if(btn_show===true){
        document.querySelector(".again").classList.add("again_hide");
        btn_show=false;
        game_stop=false;
    }
}
function start(){
    if(game_stop)return
    else{
        document.querySelector("body").addEventListener("click",
            function(){
                window.setTimeout(background_change,(math.floor(math.random()*5+3))*1000);
                document.removeEventListener("click",start);
            }
        )
    }
}
function game(){
    document.querySelector("body").addEventListener("click",
        function(e){
            if((bg_change===true)&&(btn_show===false)&&(game_stop===false)){
                let time_end=new Date();
                let score=((time_end-time_start)/1000);
                alert(`成績:${score}`);
                react_score(score);
                show_btn();
                show_score();
            }else if((bg_change===false)&&(btn_show===false)&&(game_stop===false)){
                alert("別急");
                background_change();
                show_btn();
            }
            document.querySelector(".text").innerText="點擊再玩一次";
        }
    )
}
function show_score(){
    const score_li=document.querySelectorAll("li");
    for(let i=0;i<high_score.length;i++){
        score_li[i].innerText=`第 ${i+1} 名: ${high_score[i]}`;
    }
    document.querySelector('.score_board').style.display="inline-block";
}
function sort_score(high_score, score){
    for(let i=high_score.length-1; i>=0;i--){
        if(score>high_score[i]){
            return i+1;
        }
    }
    return 0;
}
function react_score(score){
    document.querySelector("h4").innerText="反應力不錯";
    if(high_score.length<1){
        high_score.push(score);
    }else{
        if(score<high_score[high_score.length-1]){
            let insert_index=sort_score(high_score,score);
            high_score.splice(insert_index,0,score);
            high_score.splice(3);
        }else if(high_score.length<3){
            high_score.push(score);
        }else{
            document.querySelector("h4").innerText="差遠了";
        }
    }
}
function reset(){
    document.querySelector(".again").addEventListener("click",
        function(e){
            if (game_stop===true){
                document.querySelector(".text").innerText="開始測驗反應力,畫面變色時點擊螢幕";
                document.querySelector('.score_board').style.display="none";
                hide_btn();
                background_remove();
                e.stopImmediatePropagation();
            }
        }
    )
}
start();
document.querySelector("body").addEventListener("click",
    function(e){
        if(e.target.tagName==='BODY'||e.target.tagName==='DIV'){
            game();
        }else if(e.target.tagName==='BUTTON'){
            reset();
        }
    }
)