import { Clone, Repository } from "nodegit";
import { promises, createReadStream }from "fs"
import { join } from "path"
import * as readline from "readline"
import * as rimraf from 'rimraf'
import { indexedIps } from '../globals'

interface FileData {
  Maintainer?: string
}

class IpService {
  public async fetchIpData(): Promise<void> {
    try {
      // remove existing repo if present before cloning
      rimraf.sync(join(__dirname, '../../ipsets'))
      await Clone.clone("https://github.com/firehol/blocklist-ipsets.git", "./ipsets")
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  public async indexIpData(): Promise<void> {
    try {
      const ipData = {}
      const files = await promises.readdir(join(__dirname, '../../ipsets'));

      for (const file of files) {
        const fromPath = join( __dirname, '../../ipsets', file );
        const stat = await promises.stat(fromPath);
        // Check every file and look for ip lists
        if (stat.isFile() && (fromPath.includes('.netset') || fromPath.includes('.ipset'))) {
            console.log("Processing file '%s'", file);
            const fileData: FileData = {}

            const fileStream = createReadStream(fromPath);

            const lines = readline.createInterface({
              input: fileStream,
              crlfDelay: Infinity
            });

            for await (const line of lines) {
              // if line contains source metadata, parse and add to fileData
              if (line.includes('#') && line.includes('Maintainer')) {
                  const key = line.split(' : ')[0].trim().split('# ')[1]
                  const value = line.split(' : ')[1].trim()
                  fileData[key] = value
              } else {
                // fuzzy IP address match 
                if (line.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}/)) {
                  // Trim whitespace and hash the IP key to memory with the maintainer name as the value
                  const ip = line.trim()
                  if (!ipData[ip]) {
                    ipData[ip] = [fileData.Maintainer]
                  } else {
                    // Keep a list of maintainers found for a single IP value
                    if (!ipData[ip].includes(fileData.Maintainer)) {
                      ipData[ip].push(fileData.Maintainer)
                    }
                  }
                }
              }
            }

          }
        }

        indexedIps.indexed = ipData
        console.log("SUCCESSFULLY INDEXED ALL DATA")
    } catch (error) {
      console.log("ERROR", error)
    }
  }

  public initializeAutoUpdate() {
      let lastCommit

      setInterval(async () => {
        const repo = await Repository.open(join(__dirname, '../../ipsets'))

        const masterCommit = await repo.getMasterCommit()
        console.log('CHECKING REPO:', lastCommit, masterCommit.sha())
        if (!lastCommit) {
          return lastCommit = masterCommit.sha()
        }

        if (lastCommit !== masterCommit.sha()) {
          console.log('FOUND NEW COMMIT:', lastCommit, masterCommit.sha())
          lastCommit = masterCommit.sha()
          await repo.fetchAll();

          await this.indexIpData()
        }
      }, 600000)
  }
}

export default IpService;
