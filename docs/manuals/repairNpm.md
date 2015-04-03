How to Repair NPM
===

If some errors appear mentioning unlocking / locking files in */.npm, do this:

`sudo chown -R $USER ~/.npm`

`sudo chown -R $USER /usr/local/lib/node_modules`

And, if you're on a Mac and the problem persists, do this:

`sudo chown -R $USER /usr/local`