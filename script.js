'use strict';
window.onload = function() {
    var currSection = document.querySelector("section");
    var total_section = document.getElementsByTagName('section').length
    var section_num = 1;
    var currElement;
    var prevSection;
    var prevElement;
    var numSelect = 103;
    var is_selected = 0;
    var numSelectChar = -1;
    var myArr = [64,42,46,];
    var alpha;
    var nested_links = [];
    var synth = window.speechSynthesis;
    currSection.className += " active";
    var utterThis = new SpeechSynthesisUtterance("You are at the header of the webpage");
    synth.speak(utterThis);

    document.addEventListener('keydown', function(event) {
        const keyName = event.key;
        event.preventDefault();

        function speakAloud(text_to_speak) {
            synth.cancel();
            var utterThis = new SpeechSynthesisUtterance(text_to_speak);
            synth.speak(utterThis);
        }

        function speak_for_buttons() {
            if (currElement.getAttribute("title") == null) {
                var link_name = currElement.querySelector("img").getAttribute("title");
            } else {
                link_name = currElement.getAttribute("title");
            }
            speakAloud(link_name);
            // speakAloud(link_name + " Link");
        }

        function addClass(tag) {
            tag.classList.add("active");
        }

        function removeClass(tag) {
            tag.classList.remove("active");
        }

        function removeFocus() {
            if (document.activeElement !== null) {
                document.activeElement.blur();
            }
        }

        switch (keyName) {
            case "j":
                console.log("You pressed J");
                removeFocus();
                if (is_selected == 0) {
                    removeClass(currSection);
                    if (currSection.nextElementSibling.innerHTML !== "" && currSection.nextElementSibling !== null) {
                        currSection = currSection.nextElementSibling;
                        section_num++;
                    } else {
                        currSection = document.querySelector("section");
                        section_num = 1;
                    }
                    currSection.scrollIntoView();
                    addClass(currSection);
                    speakAloud("Section " + section_num);
                } else {
                    removeClass(currElement);
                    if (currElement.nextElementSibling !== null) {
                        currElement = currElement.nextElementSibling;
                    } else {
                        if (currSection.querySelector("form") !== null) {
                            currElement = currSection.querySelector("a");
                            speak_for_buttons();
                        } else {
                            currElement = currSection.querySelector("input");
                            speakAloud(currElement.getAttribute("placeholder") + " Input Box ");
                        }
                    }
                    currElement.scrollIntoView();
                    addClass(currElement);
                    if (currElement.TagName == "a") {
                        speak_for_buttons();
                    } else if (currElement.querySelector("input") !== null) {
                        speakAloud(currElement.querySelector("input").getAttribute("placeholder") + " Input Box ");
                    } else if(currElement.querySelector("select") !== null) {
                        speakAloud(currElement.querySelector("label").textContent + "Dropdown menu");
                        // speakAloud(currElement.querySelector(' option[selected="selected"]').textContent + " is Selected");  Cancelling out above statement's voice over
                    } else{
                        speakAloud(currElement.textContent);
                    }
                }
                break;

            case "f":
                console.log("You pressed F");
                removeFocus();
                if (is_selected == 0) {
                    removeClass(currSection);
                    if (currSection.previousElementSibling !== null) {
                        currSection = currSection.previousElementSibling;
                        section_num--;
                    } else {
                        currSection = document.querySelectorAll("section")[document.querySelectorAll("section").length - 1];
                        section_num = total_section;
                    }
                    currElement.scrollIntoView();
                    addClass(currSection);
                    speakAloud("Section " + section_num);
                } else {
                    removeClass(currElement);
                    if (currElement.previousElementSibling !== null) {
                        currElement = currElement.previousElementSibling;
                    } else {
                        currElement = currSection.lastElementChild;
                    }
                    currElement.scrollIntoView();
                    addClass(currElement);
                    if (currElement.TagName == "a") {
                        speak_for_buttons();
                    } else if (currElement.querySelector("input") !== null) {
                        speakAloud(currElement.querySelector("input").getAttribute("placeholder") + " Input Box ");
                    } else if(currElement.querySelector("select") !== null) {
                        speakAloud(currElement.querySelector(".selected").textContent);
                    } else {
                        speakAloud(currElement.textContent);
                    }
                }
                break;

            case "Escape":
                console.log("You pressed Escape");
                if (is_selected == 1) {
                    if (currElement.querySelector("input") === document.activeElement) {
                        currElement.querySelector("input").blur();
                        speakAloud(currElement.querySelector("input").getAttribute("placeholder") + " deselected")
                    } else {
                        removeClass(currElement);
                        currSection.scrollIntoView();
                        addClass(currSection);
                        speakAloud("Section " + section_num);
                        is_selected = 0;
                    }
                } else {
                    if (is_selected == 0 && prevSection !== undefined) {
                        removeClass(currSection);
                        prevSection.scrollIntoView();
                        addClass(prevSection);
                        prevSection = undefined;
                    }
                    // } else if (nested_links.length !== 0) {
                    // location.href = nested_links.pop();
                    else {
                        location.href = "indexhome.html";
                    }
                }
                break;

            case " ":
                console.log("You pressed Select");
                if (is_selected == 0) {
                    removeClass(currSection);
                    speakAloud("Section " + section_num + " is selected.................");
                    if (currSection.querySelector("form") !== null) {
                        prevSection = currSection;
                        currElement = currSection.querySelector("form");
                        currSection = currElement;
                        speakAloud("Forms Selected");
                    } else if (currSection.querySelector("li") !== null) {
                        currElement = currSection.querySelector("li");
                        speakAloud(currElement.textContent)
                    } else if (currSection.querySelector("input") !== null) {
                        currElement = currSection.querySelector("input");
                        speakAloud(currElement.getAttribute("placeholder") + " Input box");
                    } else if (currSection.querySelector("a") !== null) {
                        currElement = currSection.querySelector("a");
                        speak_for_buttons();
                    } else {
                        currElement = currSection.firstElementChild;
                    }
                    addClass(currElement);
                    if (currSection !== currElement)
                        is_selected = 1;
                } else {
                    if (currElement.querySelector("a") !== null) {
                        nested_links.push(location.href);
                        speakAloud("Link " + speak_for_buttons + " is selected.......");
                        location.href = currElement.querySelector("a").getAttribute("href");
                        is_selected = 0;
                    } else if (currElement.querySelector("input") !== null) {
                        if (currElement.querySelector("input").getAttribute("type") == "checkbox") {
                            if (currElement.querySelector("input").checked == true) {
                                currElement.querySelector("input").checked = false;
                            } else {
                                currElement.querySelector("input").checked = true;
                            }
                        } else if (currElement.querySelector("input").getAttribute("type") == "submit") {
                            currElement.querySelector("input").click();
                        } else if (currElement.tagName == "input") {
                            currElement.focus();
                        } else {
                            currElement.querySelector("input").focus();
                        }
                        speakAloud(currElement.querySelector("input").getAttribute("placeholder") + " is Selected");
                    }
                }
                break;

            case "c":
                console.log("Speaker Cancelled")
                synth.cancel();
                break;

            case "ArrowDown":
                console.log('up was pressed');
                if (document.activeElement.getAttribute("type") == "text") {
                    numSelect++;
                    alpha = String.fromCharCode(65 + numSelect % 26);
                    speakAloud(alpha);
                    console.log(alpha);
                }
                numSelectChar = -1;
                break;

            case "ArrowUp":
                console.log('down was pressed');
                if (document.activeElement.getAttribute("type") == "text") {
                    numSelect--;
                    alpha = String.fromCharCode(65 + numSelect % 26);
                    speakAloud(alpha);
                }
                numSelectChar = -1;
                break;

            case "ArrowRight":
                console.log('right was pressed');
                if (document.activeElement.getAttribute("type") == "text") {
                    if (alpha !== undefined) {
                        document.activeElement.value += alpha;
                        speakAloud(alpha + " typed");
                    } else {
                        speakAloud("No Character Selected for typing");
                    }
                }
                break;

            case "ArrowLeft":
                console.log('left was pressed');
                if (document.activeElement.getAttribute("type") == "text") {
                    document.activeElement.value = document.activeElement.value.slice(0, -1);
                }
                break;

            case "Control":

                if (document.activeElement.getAttribute("type") == "text") {
                    console.log("control was pressed")
                    numSelectChar++;
                    var loc = numSelectChar % (myArr.length);
                    alpha = String.fromCharCode(myArr[loc]);
                    speakAloud(alpha);
                }
                break;
        }

        event.stopPropagation();
    }, false);
}
