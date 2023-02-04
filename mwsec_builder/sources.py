import os

def load_source(source_name, processor=None):
    content = open(os.path.join("../src/sources", source_name), "r").read()
    if not processor:
        return content
    else:
        return processor(content)