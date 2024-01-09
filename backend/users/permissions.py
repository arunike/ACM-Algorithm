from rest_framework import permissions


class UserPermissions(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        return obj == request.user
