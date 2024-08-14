# Valkey service
resource "aiven_valkey" "valkey-service" {
  project                 = var.project_name
  cloud_name              = "aws-us-east-2"
  plan                    = "startup-4"
  service_name            = "valkey-agents-pub-sub"
}

# Store sensitive outputs in a temporary file
resource "local_sensitive_file" "service_uris" {
  content = <<-EOT
    VALKEY_SERVICE_URI="${aiven_valkey.valkey-service.service_uri}"
  EOT
  filename          = "../.env"
}
