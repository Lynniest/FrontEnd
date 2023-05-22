alert("fef");
const symbs = ["+","-","*","/"];

var calc_history = [];

const screen_result = document.getElementById('result');
const his_screen = document.getElementById("his-screen");
const main_screen = document.getElementById("main-screen");
const his_content = document.getElementById("his-content");

const br = document.createElement("br");

const screen_width = main_screen.offsetWidth;
const screen_height = main_screen.offsetHeight;

his_screen.style.minHeight = screen_height + "px";
his_screen.style.width = screen_width + "px";
his_screen.style.left = `calc(25% + ${screen_width}px + 1px)`;


function set_default(){
    screen_result.value = 0;
}

function clear_default(){
    if (screen_result.value.charAt(0) == 0) screen_result.value = "";
}

function remove_last(){
    screen_result.value = screen_result.value.slice(0,-1);
    if (screen_result.value.length===0) {set_default();}
}

function append(char) {
  clear_default();
    screen_result.value += char;
}

function calculate_result() {
    try {
        before_calc = result.value;
        result.value = eval(result.value);
         for (const element of symbs) {
        if(before_calc.includes(element)){
        calc_history.push(`${before_calc} = ${result.value}`);
        break;
    }
    };
    } catch (error) {
        alert("Invalid Calculation");
        set_default();
    }
}

function show_history(){
    his_content.textContent= " ";
    calc_history.forEach(element => {
        const new_element = document.createElement("div");
        new_element.classList.add("his-text");
        new_element.textContent = element;
        his_content.appendChild(new_element);
    });
    his_screen.classList.add('vis-his-container');
}

function hide_history(){
    his_screen.classList.remove('vis-his-container');
}


screen_result.addEventListener('input', function() {
  screen_result.scrollLeft = screen_result.scrollHeight;
});

document.addEventListener('keydown', function(event) {
    clear_default();
    // alert(event.key)
    if(event.key==="=" || event.key==="Enter") {calculate_result();}
    else if (!Number.isNaN(Number(event.key))===true){ screen_result.value += event.key;}
    else if (event.key === "Backspace") {remove_last();}
    else{
        for (const element of symbs) {
            if (event.key === element && screen_result.value.charAt(screen_result.value.length-1)!=element){
                screen_result.value += event.key;
                break;
            }
    };
  };
    // alert(screen_result.value.charAt(screen_result.value.length-1));
});
