#!/home/mortem45/.nvm/versions/node/v18.12.1/bin/node

// --list or --host
const option = process.argv[2]
const hostname = process.argv[3]

const inventory = {
  varnish: {
    hosts: [
      '192.168.28.71',
      '192.168.28.72'
    ],
      vars: {
      ansible_ssh_user: 'vagrant',
        ansible_password: 'value2'
    }
  },
  php: {
    hosts: ['127.0.0.2', '127.0.0.3'],
      vars: {
      ansible_user: 'php',
        ansible_password: 'php',
    }
  },
  _meta: {
    hostvars: {
      '192.168.28.71': {
        'ansible_user': 'foo'
      },
      '192.168.28.72': {
        'ansible_user': 'bar'
      }
    }
  }
}
if (option === '--host' ) {
  console.log(JSON.stringify({ _meta: { hostvars: {}}} ))
}
if (option === '--list' ) {
  console.log(JSON.stringify(inventory))
}