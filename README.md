# wcm-arcgis-module-am

This module gives you the opportunity to export map data to ArcGIS in the WCM.

## Prerequisites
 - A running implementation of the Pelorus CMS is needed either locally or on a server.
 (see https://github.com/hvperdrive/pelorus-cms)
 - Node needs to be installed on the system.
 (see https://nodejs.org)
 - Gulp needs to be installed globally on the system (npm i gulp -g).

## How to install
1. Clone or download the zip of this repository.
2. Run "npm install" in the main folder directory.
3. Run "gulp build" in the main folder directory.
4. Upload the zip created by previous steps (located in the "dist" folder).

## Usage

### API
There is no API available.

### Implementation

#### ArcGIS urls
1. Add both the polygon and point url in the settings  
    1.1. Go to modules  
    1.2. Edit the ArcGIS module  
    1.3. Under __Variables__ open the __Features__  
    1.4. Enter both the polygon and the point url  
    1.5. Save the module  
2. Every project (for AM) will be indexed and updated automatically upon saving or deleting projects.

## Module development

Please read the following on how to work with WCM modules before changing anything to this repo.

[Modules manual](https://github.com/hvperdrive/pelorus-cms/blob/develop/readmes/modules.md) <br>
[Modules manual on Digipolis Bitbucket](https://bitbucket.antwerpen.be/projects/WCM/repos/wcm/browse/readmes/modules.md)
