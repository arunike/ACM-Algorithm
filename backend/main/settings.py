"""
Django settings for main project.

Generated by 'django-admin startproject' using Django 4.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import datetime
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-6wcfe(t#wsv+m4-j&$$+r997!lq!a%ge#y8ugw=cmrph(=uk&2"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",  # JWT: JSON Web Token
    "corsheaders",  # support cross-origin
    "users",  # user app
    # "django.contrib.sites",  # allauth
    # "allauth",  # allauth
    # "allauth.account",  # allauth
    # "allauth.socialaccount",  # allauth
    # "allauth.socialaccount.providers.github",  # allauth
    "social_django",  # social_django for social login
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    # "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # support cross-origin
    "social_django.middleware.SocialAuthExceptionMiddleware",  # add this line
]

ROOT_URLCONF = "main.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "django.template.context_processors.request",  # add this line
                "social_django.context_processors.backends",  # add this line
                "social_django.context_processors.login_redirect",  # add this line
            ],
        },
    },
]

WSGI_APPLICATION = "main.wsgi.application"

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'acm_db',
        'USER': 'root',
        'PASSWORD': '1231',
        'PORT': '3306',
        'HOST': 'localhost',
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "static/"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# allow all origin
CORS_ORIGIN_ALLOW_ALL = True
# user model
AUTH_USER_MODEL = "users.User"
# DRF settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    )
}

# token settings
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": datetime.timedelta(days=7),  # 7 days
    "REFRESH_TOKEN_LIFETIME": datetime.timedelta(days=14),  # 14 days
    "ROTATE_REFRESH_TOKENS": False,  # refresh token will not be rotated
    "BLACKLIST_AFTER_ROTATION": True,  # black list after rotation
    "ALGORITHM": "HS256",  # algorithm used to encode token
    "SIGNING_KEY": SECRET_KEY,  # key used to encode token
    "VERIFYING_KEY": None,  # key used to decode token
    "AUDIENCE": None,  # audience
    "ISSUER": None,  # issuer
    "AUTH_HEADER_TYPES": ("Bearer",),  # authentication header type
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",  # authentication header name
    "USER_ID_FIELD": "id",  # user id field
    "USER_ID_CLAIM": "user_id",  # user id claim
}

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',  # default, support username and password login
    'social_core.backends.github.GithubOAuth2'  # support github login
)

SOCIAL_AUTH_GITHUB_KEY = '974506dca0d1e496cf48'
SOCIAL_AUTH_GITHUB_SECRET = '30530b773370b68abaa82a53f7af906ccc98fc90'
SOCIAL_AUTH_GITHUB_USE_OPENID_AS_USERNAME = True
SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/api/user/home/'  # TODO: change to your own url
SOCIAL_AUTH_URL_NAMESPACE = 'social'  # new added

SOCIALACCOUNT_PROVIDERS = {
    'github': {
        'SCOPE': ['user:email'],
        'VERIFIED_EMAIL': True,
    }
}
