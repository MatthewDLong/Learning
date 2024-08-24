# tls-termination.md

## Status

accepted

## Context

'SSL (TLS) termination' at the AWS ALB (Application Load Balancer) alleviates containers running in k8s Pods from using resources to decrypt SSL traffic.

## Options

A. Implement SSL (TLS) termination at the AWS ALB

B. Implement SSL (TLS) termination at the container level, adding certificates and private keys at runtime

## Decision

Implement SSL (TLS) termination at the AWS ALB

## Implications

SSL (TLS) termination at the AWS ALB provides several benefits:

- Improved Performance: SSL/TLS encryption and decryption are resource-intensive operations, and performing them on every request at the application server level can consume a significant amount of CPU and memory resources for containers running in k8s Pods. SSL termination at the load balancer offloads this work from the application servers, improving their performance and scalability.

Simplified Management: Managing SSL/TLS certificates and keys can be a complex and time-consuming task. By centralizing SSL termination at the load balancer, it is simpler to manage SSL/TLS certificates and keys, reducing the risk of misconfiguration or expiration.

Increased Security: SSL/TLS encryption protects sensitive data in transit. By terminating SSL/TLS at the load balancer, secure communication between the client and the load balancer is enforced.

Better Observability: SSL termination at the ALB provides greater visibility into the traffic flowing through the load balancer. It is possible to monitor the SSL/TLS handshake process, track SSL/TLS-related errors and performance issues, and analyze traffic patterns to identify potential security threats.

Drawbacks:

If end-to-end encryption is a requirement, from client <-> container, then SSL (TLS) termination at the AWS ALB is not secure enough.

## Notes

