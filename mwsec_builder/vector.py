import os
from yaml import load, dump
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper


class Component:
    def __init__(self, component_id, definition=None, content=None, **kwargs):
        self.component_id = component_id
        self.definition = self.define() if not definition else definition
        self.content = self.build(**kwargs) if not content else content
    
    @property
    def build_recipe(self):
        return self.definition["build"]["recipe"]
    
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
                        repl = kwargs[var]
                        if isinstance(repl, Component):
                            repl = str(repl)
                        source_file = source_file.replace(f"%%{var}%%", repl)
            return source_file
    
    def __add__(self, comp2):
        if self.build_recipe == comp2.build_recipe and self.build_recipe == "from_js_source":
            return Component(
                f"{self.component_id}+{comp2.component_id}",
                definition={"type": "auto_concat"},
                content = self.content + "\n" + comp2.content
            )
        else:
            raise ValueError
    
    def __str__(self):
        return self.content
