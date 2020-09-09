import fetch from "node-fetch";
import {
	PARSED_URL,
	TYPE_CONTENT,
	MIN_BYTES_SIZE,
	CACHED_DUMMY_URL,
	NUMBER_OF_UPLOADS,
} from "../config";
import {
	generateNameImage,
	checkName,
	saveFiles,
	updateDummyStore,
	proccessBar
} from "./utils";

let fullFiles = 0;
let dummyFiles = 0;

const tmp = [];
const dummy = [];

const fetchFile = async (name) => {
	await fetch(PARSED_URL + `${name}.jpg`)
	.then(data => {
		const length = data.headers.get("content-length");
		const type = data.headers.get("content-type");

		if(length >= MIN_BYTES_SIZE || type === TYPE_CONTENT.test(type)) {
			tmp.push({data, name});
			fullFiles++;
		} else {
			dummy.push(name);
			dummyFiles++;
		}
		
		proccessBar({
			full: fullFiles,
			dummy: dummyFiles,
		}, NUMBER_OF_UPLOADS, fullFiles);
	})
	.catch(() => {});
};

const interval = () => {
	const name = generateNameImage();
	if(checkName(name) === false) {
		fetchFile(name);
	}
	if(fullFiles >= NUMBER_OF_UPLOADS) {
		clearInterval(intervalID);
		saveFiles(tmp);
		if(CACHED_DUMMY_URL) {
			updateDummyStore(dummy);
		}
	}
};

const intervalID = setInterval(interval, 30);