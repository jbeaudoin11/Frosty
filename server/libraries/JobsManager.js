"use strict";
//Manage all jobs to be done before the server start
//If the job is a folder the main file inside must have the same name as the folder

/* Idea
	Update system
		Should be able to manage and execute Frosty updates trough a job

	Get secrets
		It might be a wait to get the secrets for tokens.
		They are in git right now and it's BAD !
*/

var Promise = require("promise");
var Path = require("path");

module.exports = class JobsManager {
	//TODO Test jobs objects

	constructor(options) {
		this.options = options;

		this._jobsFolderPath = options.jobsFolderPath;
		this._jobsData = options.jobs; //Order is important !
		/*{
			"name" : String, //same as the filename or folder
			"params" : Object //Job's parameters (only one object)
		}*/
	}

	run() {
		//Run jobs in sequance
		return new Promise((res, rej) => {
			
			var jobs = this._getJobs();



		})
	}

	_getJobs() {
		 


	}

	_runJob() {
		return new Promise((res, rej) => {
			
		})
	}

	_requireJobs(){
		//Require all jobs and return the array

		return this._jobsData.map((job) => {

			if(path.extname(job.name) == ".js"){
				//its a file

				return require(Path.join(__Config.SERVER_JOBS_PATH, job.name));
			} else {
				//its a folder

				return require(Path.join(__Config.SERVER_JOBS_PATH, Path.basename(job.name), job.name + ".js"));
			}
		})
	}
}