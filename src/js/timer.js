class Timer {

	constructor() {
			
			const secondsCurrentDate = new Date() / 1000;
			const secondsUntilTargetTime = ( 1 * 60 * 60 * 24 * 9 ) - (( 1 * 60 * 4 ) + 19 ) ;
			const targetTime = (secondsUntilTargetTime);

			this.totalSeconds = targetTime;
			this.firstTime = true;

			this.elements= {
					days: document.querySelector("[data-element=days]"),
					hours: document.querySelector("[data-element=hours]"),
					minutes: document.querySelector("[data-element=minutes]"),
					seconds: document.querySelector("[data-element=seconds]"),
			}

			this.days = {
					dataBack: this.elements.days.querySelectorAll("[data-back]"),
					dataFront: this.elements.days.querySelector("[data-front]"),
					value: 0,
					next: 0
			};

			this.hours = {
					dataBack: this.elements.hours.querySelectorAll("[data-back]"),
					dataFront: this.elements.hours.querySelector("[data-front]"),
					value: 0,
					next: 0
			};

			this.minutes = {
					dataBack: this.elements.minutes.querySelectorAll("[data-back]"),
					dataFront: this.elements.minutes.querySelector("[data-front]"),
					value: 0,
					next: 0
			};

			this.seconds = {
					dataBack: this.elements.seconds.querySelectorAll("[data-back]"),
					dataFront: this.elements.seconds.querySelector("[data-front]"),
					value: 0,
					next: 0
			};

			this.init();

	}

	// ON INIT, INITIALIZE THE INTERVAL, SET THE INITIAL NUMBERS AND CALCULATE THE TIME
	init() {
			this.tick();
			this.calculateTime();
			this.setInitialNextTime();
	}
	
	// SET INTERVAL TO CALCULATE TIME, COMPARE TIME AND UPDATE TIME EVERY SECOND
	tick() {
			let interval = setInterval(() => {
					if (this.totalSeconds < 0) return clearInterval(interval);
					this.calculateTime();
					this.compareTime();
					this.updateNextTime(); 
					this.totalSeconds--;
			}, 1000);
	}

	// TAKE THE REMAINING SECONDS AND CALCULATE HOW MANY DAYS, HOURS, MINUTES AND SECONDS ARE LEFT
	calculateTime() {
			this.days.value = Math.floor(this.totalSeconds / (3600 * 24));
			this.hours.value = Math.floor(this.totalSeconds % (3600 * 24) / 3600);
			this.minutes.value = Math.floor((this.totalSeconds % 3600) / 60);
			this.seconds.value = Math.floor(this.totalSeconds % 60);
	}

			updateNextTime = ()=>{
					this.days.next = this.days.value == 0? 30: `${this.days.value-1 < 10? `0${this.days.value-1}`: this.days.value-1}`;
					this.hours.next = this.hours.value == 0? 23: `${this.hours.values-1 < 10? `0${this.hours.value-1}`: this.hours.value-1}`;
					this.minutes.next = this.minutes.value == 0? 59: `${this.minutes.valuetes-1 < 10? `0${this.minutes.value-1}`: this.minutes.value-1}`;
					this.seconds.next = this.seconds.value == 0? 59: `${this.seconds.valuends-1 < 10? `0${this.seconds.value-1}`: this.seconds.value-1}`;
			};

			// WHEN A NUMBER GETS UPDATED, SET THE NEW TIME AND ADD THE ANIMATINO TO THE ELEMENT
			compareTime = ()=>{
					if (this.days.value == this.days.next) {
							this.setNewTime(this.days.dataFront, this.days.dataBack, this.days.next);
							this.flipCountdownTimerCard(this.elements.days);
					} if (this.hours.value == this.hours.next) {
							this.setNewTime(this.hours.dataFront, this.hours.dataBack, this.hours.next);
							this.flipCountdownTimerCard(this.elements.hours);
					} if (this.minutes.value == this.minutes.next) {
							this.setNewTime(this.minutes.dataFront, this.minutes.dataBack, this.minutes.next);
							this.flipCountdownTimerCard(this.elements.minutes);
					} if (this.seconds.value == this.seconds.next) {
							this.setNewTime(this.seconds.dataFront, this.seconds.dataBack, this.seconds.next);
							this.flipCountdownTimerCard(this.elements.seconds);
					}
			};

			// TAKES TWO ELEMENTS (FRONT AND BACK) AND THE NEXT NUMBER (FOR DAYS, HOURS, MIUNUTES AND SECONDS) AND SETS THE NEW TIME
			setNewTime = (front, back, next)=>{
					back.forEach(back => back.dataset.back = next);
					setTimeout(()=> {
							front.dataset.front = next;
					}, 900);
			};

			// SETS THE INITIAL TIME RIGHT AFTER FUNCTION EXECUTES
			setInitialNextTime = ()=> {
					this.days.next = this.days.value < 10? `0${this.days.value}`: this.days.value;
					this.hours.next = this.hours.value < 10? `0${this.hours.value}`: this.hours.value;
					this.minutes.next = this.minutes.value < 10? `0${this.minutes.value}`:this.minutes.value;
					this.seconds.next = this.seconds.value < 10? `0${this.seconds.value}`: this.seconds.value;
			};

			// TAKES A DOM ELEMENT AS PARAMETER, ADDS THE ANIMATE CLASS AND REMOVES IT AFTER 900MS
			flipCountdownTimerCard = (element)=>{
					element.classList.add("countdown__parent--animate");
					setTimeout(()=>element.classList.remove("countdown__parent--animate"), 900);
			};


}

new Timer();