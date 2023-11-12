#!/home/mortem45/.nvm/versions/node/v18.12.1/bin/node
const { getInventory,getVars, getChildGroups }= require('./oracle')

const option = process.argv[2]
const hostname = process.argv[3]

async function generateTableRows() {
  try {
    const { rows } = await getInventory()
    const { rows: vars } = await getVars()
    const { rows: childs } = await getChildGroups()    
    const inventory = new Object({_meta: {hostvars: {}}});

    inventory['all'] = {hosts: [], vars: {}}
    // Create keys by grops
    rows.forEach(async row => {
      inventory[row[0]] = {hosts: [], vars: {}}
    })

    // Add hosts by groups
    rows.forEach(async row => {
      inventory[row[0]].hosts.push(row[1])
    })

    // Create keys groups 
    childs.forEach(child => {
      inventory[child[0]] = {children: [], vars: {}}
    })

    // Add children to parents
    childs.forEach(child => {
      inventory[child[0]].children.push(child[1])
    })

    // Add vars by groups
    vars.forEach(async vr => {
      inventory[vr[0]].vars[vr[1]] = vr[2] 
    })

    if (option === '--host' ) {
      console.log(JSON.stringify({ _meta: { hostvars: {} }}))
    }
    if (option === '--list' ) {
      console.log(JSON.stringify(inventory))
    }
  } catch (error) {
    console.log('🚀 ~ file: generateDatabyOracle.js:47 ~ generateTableRows ~ error:', error)
  }
}

generateTableRows().catch(console.error);