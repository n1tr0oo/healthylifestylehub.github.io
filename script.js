const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		console.log(entry)
		if (entry.isIntersecting) {
			entry.target.classList.add('show');
		} else {
			entry.target.classList.remove('show');
		}
	});
});
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


const audio = new Audio("audio.mp3");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    audio.play();
  });
});


document.querySelector('.bmi').addEventListener('click',bmi);

  function bmi() {
	let a = parseFloat(document.querySelector('.num1').value);
	let b = parseFloat(document.querySelector('.num2').value);
    let c = a/(b*b);
	
	if(c<=18.5){
		document.querySelector('.out1').innerHTML = "Your BMI is "+ c + " so you are underweight."; 
		
	}
	else if(c>18.5 && c<24.9){
		document.querySelector('.out1').innerHTML = "Your BMI is "+ c + " so you have a normal weight.";
		
	}
	else if(c>=24.9){
		document.querySelector('.out1').innerHTML = "Your BMI is "+ c + " so you are overweight.";
	}
   
  }


