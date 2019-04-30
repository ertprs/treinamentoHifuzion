from django.db import models
from django.utils import timezone
from django.utils.translation import gettext as _


class BaseModel(models.Model):
    """
    Basic data for class
    """
    user = models.ForeignKey('core.User', verbose_name=_('user'), on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(_('created at'), auto_now_add=True)
    updated_at = models.DateTimeField(_('updated at'), auto_now=True)

    class Meta:
        abstract = True

    def __str__(self):
        return f'{self.pk}'


class Coach(BaseModel):
    """
    Coach model
    """

    MASTER = 'M'
    TEACHER = 'T'

    TITLE = (
        (MASTER, _('master')),
        (TEACHER, _('teacher')),
    )

    name = models.CharField(_('name'), max_length=100)
    title = models.CharField(_('title'), max_length=1, choices=TITLE, default=MASTER)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Athlete(BaseModel):
    """
    Athetle model
    """

    MALE = 'M'
    FEMALE = 'F'

    GENDER = (
        (MALE, _('Male')),
        (FEMALE, _('Female')),
    )

    name = models.CharField(_('name'), max_length=100)
    nickname = models.CharField(_('nickname'), max_length=100, null=True, blank=True)
    gender = models.CharField(_('gender'), max_length=1, choices=GENDER, default=FEMALE)
    phone = models.CharField(_('phone'), max_length=20)
    birthday = models.DateField(_('birthday'))
    start_training = models.DateField(_('start training'))
    document_id = models.CharField(_('document id'), max_length=30)
    email = models.EmailField(_('email'), null=True, blank=True)
    address = models.TextField(_('address'))
    instagram = models.CharField(_('instagram'), max_length=255, null=True, blank=True)
    facebook = models.CharField(_('facebook'), max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    user = models.ForeignKey('core.User', verbose_name=_('user'), on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    @property
    def belt(self):
        graduation = self.graduation_set.all().last()
        if graduation is None:
            return _('no graduation')

        return f'{graduation.get_belt_display()} / {graduation.degrees}'


class Graduation(BaseModel):
    """
    Graduation model
    """

    WHITE = 'WHI'
    GREY = 'GRE'
    YELLOW = 'YEL'
    ORANGE = 'ORA'
    GREEN = 'GRE'
    BLUE = 'BLU'
    PURPLE = 'PUR'
    BROWN = 'BRO'
    BLACK = 'BLA'

    BELTS = (
        (WHITE, _('White')),
        (GREY, _('Grey')),
        (YELLOW, _('Yellow')),
        (ORANGE, _('Orange')),
        (GREEN, _('Green')),
        (BLUE, _('Blue')),
        (PURPLE, _('Purple')),
        (BROWN, _('Brown')),
        (BLACK, _('Black')),
    )

    MIX = (
        (WHITE, _('White')),
        (BLACK, _('Black')),
    )

    athlete = models.ForeignKey('academy.Athlete', verbose_name=_('athlete'), on_delete=models.CASCADE)
    belt = models.CharField(_('belt'), max_length=3, choices=BELTS, default=WHITE)
    belt_mix = models.CharField(_('belt mix'), max_length=3, choices=MIX, null=True, blank=True)
    degrees = models.IntegerField(_('degrees'), default=0)
    date = models.DateField(_('date'), default=timezone.now)

    def __str__(self):
        return f'{self.pk}'


class Team(BaseModel):
    """
    Team model
    """

    name = models.CharField(_('name'), max_length=100)
    competition = models.BooleanField(_('competition'), default=False)
    athletes = models.ManyToManyField('academy.Athlete', verbose_name=_('athletes'))
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Training(BaseModel):
    """
    Training model
    """

    start_class = models.DateTimeField(_('start class'))
    team = models.ForeignKey('academy.Team', verbose_name=_('team'), on_delete=models.CASCADE)
    coach = models.ForeignKey('academy.Coach', verbose_name=_('coach'), on_delete=models.CASCADE)
    notes = models.TextField(_('notes'), null=True, blank=True)
    athletes = models.ManyToManyField('academy.Athlete', verbose_name=_('athletes'))

    def __str__(self):
        return f'{self.pk}'


class Measure(BaseModel):
    """
    Measure model
    """

    date = models.DateField(_('date'), auto_now_add=True)
    athlete = models.ForeignKey('academy.Athlete', verbose_name=_('athlete'), on_delete=models.CASCADE)
    height = models.DecimalField(_('height'), max_digits=7, decimal_places=2, default=0)
    weight = models.DecimalField(_('weight'), max_digits=7, decimal_places=2, default=0)
    notes = models.TextField(_('notes'), null=True, blank=True)

    def __str__(self):
        return self.athlete.name
