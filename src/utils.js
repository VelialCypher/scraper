import fs from "fs";
import {UPLOAD_PATH, CACHE_PATH, NUMBER_OF_UPLOADS} from "../config";

const getRandomInRange = (min, max) => {
	const rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
};

const getLowerCaseSymbol = () => {
	return String.fromCharCode(getRandomInRange(97, 122));
};

const getUpperCaseSymbol = () => {
	return String.fromCharCode(getRandomInRange(65, 90));
};

const getRandomNumber = () => getRandomInRange(0, 9);

const randomChoice = (...args) => {
	return args[Math.floor(Math.random() * args.length)];
};

export const generateNameImage = () => {
	let fileName = "";

	for(let i = 0; i < 6; i++) {
		const char = randomChoice(getUpperCaseSymbol, getRandomNumber, getLowerCaseSymbol);
		fileName += char();
	}

	return fileName;
};

export const saveFiles = (data) => {
	data.forEach(async ({data, name}) => {
		const fileStream = fs.createWriteStream(UPLOAD_PATH + `${name}.jpg`);
		await new Promise((resolve, reject) => {
			data.body.pipe(fileStream);
	
			data.body.on("error", (err) => reject(err));
			fileStream.on("finish", () => resolve());
		});
	});
};

export const updateDummyStore = (dummy) => {
	const fileContent = fs.readFileSync(CACHE_PATH + "dummy.json", "utf8");
	const data = JSON.parse(fileContent);
	data.push(...dummy);
	fs.writeFileSync(CACHE_PATH + "./dummy.json", JSON.stringify(data, null, 4));
};

export const checkName = (name) => {
	const fileContent = fs.readFileSync(CACHE_PATH + "dummy.json", "utf8");
	const data = JSON.parse(fileContent);
	const valid = data.some(itemName => name === itemName);
	return valid;
};

const getPercents = (max, value, end = 100) => {
	return (value * end) / max;
};

export const proccessBar = (data, end, select, length = 16) => {
	let bar = "";
	const countHashTags = Math.floor(getPercents(end, select, length));
	for(let i = 0; i < length; i++) {
		if(i <= countHashTags) {
			bar += "#";
		} else {
			bar += ".";
		}
	}
	console.log("[" + bar + "] " + `${getPercents(end, select)}% ` +
	`Files: ${data.full}(${NUMBER_OF_UPLOADS}}) / Dummy: ${data.dummy}`);
};