# serverless.md

## Status

accepted

## Context

k8s Worker Nodes run compute workloads. AWS EC2 Node Groups can be used, or Serverless can be used (AWS Fargate).

Provisioning EC2 Node Groups requires paying 'On Demand' Instance prices (which are significant), or to get a reduced price 'Reserved Instance' capacity reservations, however because application usage is unlikely to have a constant level of load at all times, this involves 'overprovisioning' or 'under provisioning' Worker Node Compute capacity, which is a waste of:

- Compute Capacity
- Electricity
- Money

This also involves significant operational overhead:

- Provisioning, configuring, scaling, maintaining, patching EC2 Node Groups

Running Kubernetes Pods on AWS Fargate (using Fargate profiles) allows running right-sized compute capacity for containers, which adjusts with app workload.

This alleviates a significant operational overhead.

Amazon EKS integrates Kubernetes with Fargate by using controllers that are built by AWS using the upstream, extensible model provided by Kubernetes. These controllers run as part of the Amazon EKS managed Kubernetes control plane and are responsible for scheduling native Kubernetes pods onto Fargate. The Fargate controllers include a new scheduler that runs alongside the default Kubernetes scheduler in addition to several mutating and validating admission controllers. When you start a pod that meets the criteria for running on Fargate, the Fargate controllers that are running in the cluster recognize, update, and schedule the pod onto Fargate.

It is important to chose the right tool for the right job. There are some situations where running an EC2 Node Group is better than running Serverless Fargate Pods.

## Options

A. Running Kubernetes Pods on AWS EC2 Node Groups

B. Running Kubernetes Pods on AWS Fargate (using Fargate profiles) 

## Decision

B. Running Kubernetes Pods on AWS Fargate (using Fargate profiles) 

## Implications

Benefits:

There's several benefits to running Kubernetes Pods on AWS Fargate (using Fargate profiles):

- More cost and time efficient than provisioning EC2 Node Group
- Less operational overhead
- No 'overprovisioning' or 'under provisioning'
- Security benefits e.g. Amazon EKS Fargate adds defense-in-depth for Kubernetes applications by isolating each Pod within a Virtual Machine (VM). This VM boundary prevents access to host-based resources used by other Pods in the event of a container escape, which is a common method of attacking containerized applications and gain access to resources outside of the container.


Drawbacks:

There's considerations to be made when using EKS with Fargate profiles, and depending on the use cases, it may not be appropriate. e.g. Privileged containers aren't supported on Fargate. Therefore you cannont run a container in priviliged mode on EKS with Fargate profiles.

More details here: https://docs.aws.amazon.com/eks/latest/userguide/fargate.html

## Notes
