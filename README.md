# DeveloperTestProject

   Utilizes Google Maps API, AngularJS, RethinkDB, NodeJS, and Express to display live tracking data updates on an interactive world map. Can interact with ship icons to see corresponding information on ship from tracking data. Accepts POST requests containing a list of tracking objects in JSON format.

## Build & development

### Prerequisites

   Must have git, RethinkDB, and NodeJS installed on your machine.

#### Git
   *For other systems please see: <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>*
		
   **Debian-based Linux:** `sudo apt-get install -y git-all`

   **RPM-based Linux:** `sudo dnf install git-all`

#### RethinkDB
   *For other systems please see: <https://rethinkdb.com/docs/install/>*

   **Ubuntu Linux:**
        `source /etc/lsb-release && echo "deb http://download.rethinkdb.com/apt $DISTRIB_CODENAME main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
         wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
         sudo apt-get update
         sudo apt-get install -y rethinkdb`

   **Debian-based Linux:**
        `echo "deb http://download.rethinkdb.com/apt ``lsb_release -cs`` main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list\
         wget -qO- https://download.rethinkdb.com/apt/pubkey.gpg | sudo apt-key add -
         sudo apt-get update
         sudo apt-get install -y rethinkdb`

   **CentOS 6 (Works on most RPM-based Linux):**
        `sudo wget http://download.rethinkdb.com/centos/6/``uname -m``/rethinkdb.repo \
         -O /etc/yum.repos.d/rethinkdb.repo
         sudo yum install rethinkdb`

   **CentOS 7 (Works on most RPM-based Linux):**
        `sudo wget http://download.rethinkdb.com/centos/7/``uname -m``/rethinkdb.repo \
         -O /etc/yum.repos.d/rethinkdb.repo
         sudo yum install rethinkdb`
             
#### NodeJS
   *For other systems please see: <https://nodejs.org/en/download/package-manager/>*

   **Debian-based Linux:**
        `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
         sudo apt-get install -y nodejs
         sudo apt-get install -y build-essential`

   **RPM-based Linux:**
        `curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
         sudo yum -y install nodejs
         sudo yum -y install gcc-c++ make`


### Installation

   1. Install all of the prerequisites listed above.
   2. Clone git repository by entering the following in terminal: `git clone "https://github.com/emayo16/DeveloperTestProject.git"`
   3. Run npm install from DeveloperTestProject directory after cloning repository. 
   4. Next, type `rethinkdb` in terminal to run database server.
   5. Open a new terminal window and type `node server` to run server.
   6. Navigate to http://localhost:3000/ in your browser to view site.

## Usage

   Accepts POST requests containing JSON formatted list of objects (tracking data) with the following properties: name, latitude, longitude, callsign, mmsid, speed, heading, and course.

 Uri | Request Method
 --- | --- 
 /api/tracks/new | POST 
 
*Example JSON Request Body:*

		`[{ 
			"name": "Carnival Ecstacy", 
		    "latitude": "32.78083", 
		    "longitude": "-79.9234", 
		    "callsign": "H3GR", 
		    "mmsid": "353479000", 
		    "speed": "10.6", 
		    "course": "90", 
		    "heading": "90"}, 
		    { "name": "Carnival Ecstacy2", 
		    "latitude": "44.78083", 
		    "longitude": "-60.9234", 
		    "callsign": "F3GR", 
		    "mmsid": "353478000", 
		    "speed": "10.6", 
		    "course": "90", 
		    "heading": "90"}]`
