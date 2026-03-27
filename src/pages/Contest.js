import React, { useState, useEffect } from "react";
import "./contest.css";
import { Link, useNavigate } from "react-router-dom";
import winCard1 from "../images/winningCard1.png";
import winCard2 from "../images/winningCard2.png";
import winCard3 from "../images/winningCard3.png";
import loseCard2 from "../images/losingCard2.png";
import loseCard3 from "../images/losingCard3.png";

import Win from "./Win";
import Lose from "./Loss";

import {
    checkLastPlayed,
    getLocalData,
    getPrize,
    saveLastPlayed,
    getAvailablePrizes,
    saveDataLocal,
} from "../firebase-functions";

const Contest = () => {
    const [canPlay, setCanPlay] = useState(false);
    const [win, setWin] = useState(false);
    const [prize, setPrize] = useState();
    const [finished, setFinished] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const localData = getLocalData();

        // Guard: if no local data or no email, send back to home
        if (!localData || !localData.email) {
            navigate("/");
            return;
        }

        checkLastPlayed(localData.email).then((lastPlayed) => {
            saveDataLocal(localData, lastPlayed);
            if (lastPlayed != null) {
                const hours =
                    (new Date().getTime() - new Date(lastPlayed).getTime()) /
                    (1000 * 3600);
                setCanPlay(hours >= 72);
            } else {
                setCanPlay(true);
            }
        });

        getAvailablePrizes().then((prizes) => {
            if (localData.secret === true) {
                setWin(true);
            } else {
                const winChance = prizes.length / 69240;
                setWin(Math.random() < winChance);
            }
        });

        getPrize().then((p) => setPrize(p));
    }, []);

    useEffect(() => {
        if (finished) {
            saveLastPlayed();
        }
    }, [finished]);

    const localData = getLocalData();
    if (!localData) return null;

    return (
        <>
            {finished ? (
                win ? (
                    <Win prize={prize} />
                ) : (
                    <Lose />
                )
            ) : canPlay ? (
                <main className="contest">
                    <h1 className="textCenter">Good Luck {localData.fName}!</h1>
                    <ScratchCard setFinished={setFinished} isWin={win} />
                    <section className="innerCard">
                        <h2>Instructions</h2>
                        <p>
                            Use your mouse or touchscreen to scratch off the card and uncover
                            prizes ranging from BuyMore Dollars to exciting rewards.
                        </p>
                        <p>
                            Winners will be selected through a random draw. If you're fortunate
                            enough to win, be prepared to answer a skill-testing question to
                            claim your prize.
                        </p>
                        <p>
                            The leadership team of BuyMore Dollars Inc. reserves the right to
                            remove entries for any reason, ensuring fairness throughout the
                            contest.
                        </p>
                        <Link to="/legal" state={"/contest"}>
                            Terms and Conditions
                        </Link>
                    </section>
                </main>
            ) : (
                <main className="contest">
                    <section className="innerCard flexCol gap1 flexCenter">
                        <h2>Sorry, you've already played within the last 72 hours.</h2>
                        <Link to="/">
                            <button className="blueButton">Back to Home</button>
                        </Link>
                    </section>
                </main>
            )}
        </>
    );
};

const ScratchCard = ({ setFinished, isWin }) => {
    const winCards = [winCard1, winCard2, winCard3];
    const loseCards = [loseCard2, loseCard3];
    const card = isWin
        ? winCards[Math.floor(Math.random() * winCards.length)]
        : loseCards[Math.floor(Math.random() * loseCards.length)];

    useEffect(() => {
        const canvas = document.getElementById("scratch");
        const context = canvas.getContext("2d", { willReadFrequently: true });
        const RADIUS = 28;
        let isDragged = false;

        canvas.width = 300;
        canvas.height = 300;
        context.fillStyle = "#F3CE4F";
        context.fillRect(0, 0, canvas.width, canvas.height);

        const getXY = (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            if (e.touches && e.touches.length > 0) {
                return {
                    x: (e.touches[0].clientX - rect.left) * scaleX,
                    y: (e.touches[0].clientY - rect.top) * scaleY,
                };
            }
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY,
            };
        };

        const scratch = ({ x, y }) => {
            context.globalCompositeOperation = "destination-out";
            context.beginPath();
            context.arc(x, y, RADIUS, 0, 2 * Math.PI);
            context.fill();
        };

        const getScratchPercent = () => {
            const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
            let cleared = 0;
            for (let i = 3; i < data.length; i += 4) {
                if (data[i] === 0) cleared++;
            }
            return (cleared / (canvas.width * canvas.height)) * 100;
        };

        const handleStart = (e) => {
            e.preventDefault();
            isDragged = true;
            scratch(getXY(e));
        };

        const handleMove = (e) => {
            e.preventDefault();
            if (isDragged) scratch(getXY(e));
        };

        const handleEnd = (e) => {
            e.preventDefault();
            isDragged = false;
            if (getScratchPercent() > 50) setFinished(true);
        };

        canvas.addEventListener("mousedown", handleStart);
        canvas.addEventListener("mousemove", handleMove);
        canvas.addEventListener("mouseup", handleEnd);
        canvas.addEventListener("mouseleave", handleEnd);
        canvas.addEventListener("touchstart", handleStart, { passive: false });
        canvas.addEventListener("touchmove", handleMove, { passive: false });
        canvas.addEventListener("touchend", handleEnd, { passive: false });

        return () => {
            canvas.removeEventListener("mousedown", handleStart);
            canvas.removeEventListener("mousemove", handleMove);
            canvas.removeEventListener("mouseup", handleEnd);
            canvas.removeEventListener("mouseleave", handleEnd);
            canvas.removeEventListener("touchstart", handleStart);
            canvas.removeEventListener("touchmove", handleMove);
            canvas.removeEventListener("touchend", handleEnd);
        };
    }, []);

    return (
        <section id="scratchContainer">
            <div id="scratchCard">
                <div className="base">
                    <img src={card} alt="scratch card" />
                </div>
                <canvas
                    id="scratch"
                    width={300}
                    height={300}
                    style={{ touchAction: "none", cursor: "crosshair" }}
                />
            </div>
        </section>
    );
};

export default Contest;