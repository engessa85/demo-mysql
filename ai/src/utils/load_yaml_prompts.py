import yaml

def load_prompts(path: str):
    try:
        with open(path, "r") as file:
            return yaml.safe_load(file)
    except FileNotFoundError:
        raise FileNotFoundError(f"YAML file not found: {path}")
    except yaml.YAMLError as e:
        raise yaml.YAMLError(f"Invalid YAML format in {path}: {e}")