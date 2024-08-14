# Integrating Valkey pub/sub with Amazon Bedrock for AI agent

Follow this tutorial that will walk you through setting up a communication system between AI agents using Aiven for Valkey and Amazon Bedrock’s Claude model. The goal is to enable agents to operate independently while staying in sync through a pub/sub service.

This setup is particularly useful in scenarios like automating customer support, managing IoT devices, or any situation where systems need to communicate in real-time.

In this tutorial we'll take an example of two inhabitants of an imaginary planet that meet and start talking.

### Create Aiven services with a Terraform script
The terraform files can be found in `./terraform` folder of the current project.
`./terraform/terraform.tfvars-example` provides an example of *tfvars* file. 

1. Rename (or create a new file) to `./terraform/terraform.tfvars`.
2. Populate aiven_api_token with the token that you copied from the console.
3. Populate project_name with the name of the Aiven project.
4. Navigate to `terraform` folder
5. Set `export PROVIDER_AIVEN_ENABLE_BETA=true` in the terminal (Terraform Valkey resource is still in beta stage).
6. Run `terraform init`.
7. Run `terraform plan`.
8. Run `terraform apply`.

Terraform will initiate creation of resources:
- Aiven for Valkey

Once deployment is done, Terraform will also create `.env` file with necessary credentials to access the services.
