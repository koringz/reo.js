import { HandlebarsEnvironment } from './valid';
import logger from './defaultTest';

let _void = {};
HandlebarsEnvironment( _void, _void, _void );

const human = HandlebarsEnvironment; 

function create () {
	let _human = new human;

	return _human;
}

let params = new create();

console.log(params.a);

