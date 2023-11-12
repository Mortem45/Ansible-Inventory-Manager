#!/home/mortem45/.nvm/versions/node/v18.12.1/bin/node
const { getInventory,getVars, getChildGroups }= require('./mysql')

const option = process.argv[2]
const hostname = process.argv[3]

async function generateTableRows() {
  try {
    const rows = await getInventory()
    const vars = await getVars()
    const childs = await getChildGroups()    

    const inventory = new Object({_meta: {hostvars: {}}});
    
    inventory['all'] = {hosts: [], vars: {}}
    // Create keys by grops
    rows.forEach(async row => {
      inventory[row.group_name] = {hosts: [], vars: {}}
    })

    // // Add hosts by groups
    rows.forEach(async row => {
      inventory[row.group_name].hosts.push(row.host)
    })

    // // Create keys groups 
    childs.forEach(child => {
      inventory[child.parent] = {children: [], vars: {}}
    })

    // // Add children to parents
    childs.forEach(child => {
      inventory[child.parent].children.push(child.child)
    })

    // // Add vars by groups
    vars.forEach(async vr => {
      inventory[vr.group_name].vars[vr.var_name] = vr.vas_value
    })
    
    console.log(inventory);
    if (option === '--host' ) {
      console.log(JSON.stringify({ _meta: { hostvars: {} }}))
    }
    if (option === '--list' ) {
      console.log(JSON.stringify(inventory))
    }
  } catch (error) {
    console.log('🚀 ~ file: generateDatabyMysql.js:50 ~ generateTableRows ~ error:', error)
  }
}

generateTableRows().catch(console.error);