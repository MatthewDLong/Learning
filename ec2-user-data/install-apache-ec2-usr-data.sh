#!/bin/bash
yum update -y
yum install -y httpd.x86_64
systemctl start httpd.service
systemctl enable httpd.service
echo "hello from $(hostname -f)" > /var/www/html/index.html

# availability zone

#!/bin/bash
yum update -y
yum install -y httpd.x86_64
systemctl start httpd.service
systemctl enable httpd.service
EC2_AVAIL_ZONE=$(curl -s http://169.254.169.254/latest/meta-data/placement/availability-zone)
echo "hello from $(hostname -f) in AZ $EC2_AVAIL_ZONE" > /var/www/html/index.html
