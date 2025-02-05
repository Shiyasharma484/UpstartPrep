=======================================================================
STEP - 1 Start Xamp Server
start xampp
sudo /opt/lampp/lampp start
—------------------------------------
stop xampp
sudo /opt/lampp/lampp stop
=======================================================================
STEP - 2 Check database exists
http://localhost/phpmyadmin/ open the link to see database is present or not
=======================================================================
STEP - 3 Start project
goto client folder in project directory
Open cmd
Hit command 
npm start
And wait to see browser window being opened and dashboard being displayed
=======================================================================
ERRORS—>
If any error comes up for server already running
killall -9 node
kill all node servers
=======================================================================
watchers reached
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
=======================================================================
other issues may be realted to packages or dl open issue
then remove node_modules and open cmd in client folder and hit command npm install
if it fails then hit command npm install -f
and follow step 3 again
=======================================================================
