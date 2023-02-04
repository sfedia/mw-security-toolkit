import os
from yaml import load, dump
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper


class Component:
    def __init__(self, component_id):
        self.component_id = component_id
        self.definition = self.define()
    
    def define(self):
        all_components = os.listdir("../src/components")
        for component_file_name in all_components:
            stream = open(os.path.join("../src/components", component_file_name), "r")
            component_data = load(stream, Loader=Loader)
            if component_data["component-id"] == self.component_id:
                return component_data
        raise ValueError(f"Component '{self.component_id}' not found")
    
    def build(self, **kwargs):
        if self.definition["build"]["recipe"] == "from_js_source":
            source_file_name = self.definition["build"]["source-name"]
            source_file = open(os.path.join("../src/sources", source_file_name), "r").read()
            if "requirements" in self.definition:
                if "env-variables" in self.definition["requirements"]:
                    for var in self.definition["requirements"]["env-variables"]:
                        source_file = source_file.replace(f"%%{var}%%", kwargs[var])
            return source_file
