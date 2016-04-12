# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
	config.vm.box = "ubuntu/trusty64"
	config.vm.provision :shell, :path => "setup.sh"
	config.vm.synced_folder ".", "/src", create: true
end