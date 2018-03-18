# coding=utf-8
from __future__ import absolute_import

import string
import random

import octoprint.plugin


class OctoPrintNano(octoprint.plugin.UiPlugin, octoprint.plugin.TemplatePlugin):
    api_key = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(10))
    @classmethod
    def keyvalidator_hook(cls, apikey, *args, **kwargs):
        if apikey != cls.api_key:
            return None
        from octoprint.users import DummyUser
        return DummyUser()

    def will_handle_ui(self, request):
        return request.args.has_key('nano') # e.g. http://octo.pi/?nano

    def on_ui_render(self, now, request, render_kwargs):
        from flask import make_response, render_template
        return make_response(render_template("octoprintnano_index.jinja2", api_key=self.api_key))

__plugin_name__ = "OctoPrintNano"
__plugin_hooks__ = {
    "octoprint.accesscontrol.keyvalidator": OctoPrintNano.keyvalidator_hook
}
__plugin_implementation__ = OctoPrintNano()
