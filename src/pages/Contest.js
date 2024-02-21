import React, { useState, useEffect } from "react";
import "./contest.css";
import { Link, useNavigate } from "react-router-dom";
import winCard1 from "../images/winningCard1.png";
import winCard2 from "../images/winningCard2.png";
import winCard3 from "../images/winningCard3.png";
import loseCard2 from "../images/losingCard2.png";
import loseCard3 from "../images/losingCard3.png";

const Contest = () => {
	let prizes = [
		{ value: "10000", numOfPrizes: 1 },
		{ value: "750", numOfPrizes: 5 },
		{ value: "100", numOfPrizes: 10 },
		{ value: "20", numOfPrizes: 100 },
	];
	let prizePool = [];
	prizes.forEach((prize) => {
		for (let i = 0; i < prize.numOfPrizes; i++) {
			prizePool.push(prize);
		}
	});
	let numOfPrizes = prizePool.length;

	function willWin() {
		let numOfPeople = 69420;
		let winChance = numOfPrizes / numOfPeople;
		return Math.random() < winChance ? true : false;
	}

	function whichPrize() {
		let prize = prizePool[Math.floor(Math.random() * numOfPrizes)];
		return prize.value;
	}
	let win = willWin();
	let prize = whichPrize();
	console.log(prize);
	return (
		<main className='contest'>
			<ScratchCard willWin={win} whichPrize={prize} />
			<section className='innerCard'>
				<h2>Instructions</h2>
				<p>
					Use your mouse or touchscreen to scratch off the card and uncover prizes
					ranging from BuyMore Dollars to exciting rewards.{" "}
				</p>
				<p>
					Winners will be selected through a random draw, adding an element of
					anticipation to each play. If you're fortunate enough to win, be prepared
					to answer a skill-testing question to claim your prize.{" "}
				</p>
				<p>
					Please note that the leadership team of BuyMore Dollars Inc. reserves the
					right to remove entries for any reason, ensuring fairness throughout the
					contest.{" "}
				</p>
				<Link to='/legal' state={"/contest"}>
					Terms and Conditions
				</Link>
			</section>
		</main>
	);
};

const ScratchCard = ({ isWin, whichPrize }) => {
	const [deviceType, setDeviceType] = useState({ touch: false });
	const winCards = [winCard1, winCard2, winCard3];
	const loseCards = [loseCard2, loseCard3];
	const navigate = useNavigate();

	useEffect(() => {
		const container = document.getElementById("scratchCard");
		const canvas = document.getElementById("scratch");
		const context = canvas.getContext("2d", { willReadFrequently: true });
		let scratchPercent = 0;
		const pixels = () => {
			return context.getImageData(0, 0, canvas.width, canvas.height);
		};

		console.log(container.offsetHeight);
		const canvasWidth = container.offsetWidth / 1.52;
		const canvasHeight = container.offsetHeight / 2.3;
		console.log(canvasHeight);

		const init = () => {
			// context.scale(container.offsetWidth / 1.52, container.offsetHeight / 2.3);
			canvas.width = canvasWidth;
			canvas.height = canvasHeight;
			context.fillStyle = "#F3CE4F";
			context.fillRect(0, 0, canvasWidth, canvasHeight);
		};

		const draw = () => {
			let oldPixels = pixels();
			let canvasWidthOld = canvas.width;
			let canvasHeightOld = canvas.height;
			canvas.width = container.offsetWidth / 1.52;
			canvas.height = container.offsetHeight / 2.32;
			console.log(canvas.width, oldPixels.width);
			// context.fillStyle = "#F3CE4F";
			context.scale(
				canvas.width / oldPixels.width,
				canvas.height / oldPixels.height
			);
			context.putImageData(oldPixels, 0, 0);
			// if (canvasWidthOld < canvas.width) {
			// 	context.fillRect(
			// 		canvasWidthOld,
			// 		0,
			// 		canvas.width - canvasWidthOld,
			// 		canvas.height
			// 	);
			// }
			// if (canvasHeightOld < canvas.height) {
			// 	context.fillRect(
			// 		0,
			// 		canvasHeightOld,
			// 		canvas.width,
			// 		canvas.height - canvasHeightOld
			// 	);
			// }
		};

		let mouse = {
			x: null,
			y: null,
			radius: 10,
		};

		let isDragged = false;

		const scratch = (mouse) => {
			context.globalCompositeOperation = "destination-out";
			context.beginPath();
			context.arc(mouse.x, mouse.y, mouse.radius, 0, 2 * Math.PI);
			context.fill();
			// scratchedPixels = context.getImageData(0, 0, canvas.width, canvas.height);
			// console.log(scratchedPixels.data);
		};

		const handleStart = (event) => {
			isDragged = true;
			getXY(event);
			scratch(mouse);
		};

		const handleMove = (event) => {
			if (!deviceType.touch) {
				event.preventDefault();
			}
			if (isDragged) {
				getXY(event);
				scratch(mouse);
			}
		};

		const handleEnd = () => {
			isDragged = false;
			scratchPercent = getScratchPercent();
			if (scratchPercent > 50) {
				if (isWin) {
					navigate("/win", { state: { prize: whichPrize } });
				} else {
					navigate("/lose");
				}
			}
			// console.log(getScratchPercent());
		};

		let rectLeft = canvas.getBoundingClientRect().left;
		let rectTop = canvas.getBoundingClientRect().top;

		const getXY = (e) => {
			console.log(e.x, e.y);
			mouse.x = (!deviceType.touch ? e.x : e.touches[0].x) - rectLeft;
			mouse.y = (!deviceType.touch ? e.y : e.touches[0].y) - rectTop;
			console.log(mouse.x, mouse.y);
			console.log(rectLeft, rectTop);
		};

		function getScratchPercent() {
			let pixelsTemp = pixels().data;
			let pixelCount = 0;
			for (let i = 0; i < pixelsTemp.length; i += 4) {
				if (pixelsTemp[i + 3] === 0) {
					pixelCount++;
				}
			}
			return (pixelCount / (canvas.width * canvas.height)) * 100;
		}

		const canvasEvents = {
			down: deviceType.touch ? "touchstart" : "mousedown",
			move: deviceType.touch ? "touchmove" : "mousemove",
			up: deviceType.touch ? "touchend" : "mouseup",
		};

		canvas.addEventListener(canvasEvents.down, handleStart);
		canvas.addEventListener(canvasEvents.move, handleMove);
		canvas.addEventListener(canvasEvents.up, handleEnd);
		canvas.addEventListener("mouseleave", handleEnd);

		const isTouchDevice = () => {
			try {
				document.createEvent("TouchEvent");
				return true;
			} catch (e) {
				return false;
			}
		};

		setDeviceType({ touch: isTouchDevice() });

		window.addEventListener("resize", function (event) {
			draw();
		});

		init();
	}, []);

	let card = isWin
		? winCards[Math.floor(Math.random() * winCards.length)]
		: loseCards[Math.floor(Math.random() * loseCards.length)];

	return (
		<section id='scratchContainer'>
			<div id='scratchCard'>
				<div className='base'>
					<img src={card} alt='scratch card' />
				</div>
				<canvas id='scratch'></canvas>
			</div>
		</section>
	);
};

export default Contest;
