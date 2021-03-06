"""first new start on this repo

Revision ID: d53fdabb3475
Revises: 
Create Date: 2022-05-07 23:06:11.363857

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd53fdabb3475'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('address',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('street_address_1', sa.String(), nullable=False),
    sa.Column('city', sa.String(), nullable=False),
    sa.Column('state_id', sa.String(), nullable=False),
    sa.Column('country', sa.String(), nullable=False),
    sa.Column('zipcode', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_address_id'), 'address', ['id'], unique=False)
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=256), nullable=True),
    sa.Column('last_name', sa.String(length=256), nullable=True),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=True),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_user_email'), 'user', ['email'], unique=False)
    op.create_index(op.f('ix_user_id'), 'user', ['id'], unique=False)
    op.create_table('cast_iron',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('label', sa.String(length=256), nullable=False),
    sa.Column('Vulcan_style_code', sa.String(length=64), nullable=False),
    sa.Column('EJ_code', sa.String(length=64), nullable=True),
    sa.Column('SIP_code', sa.String(length=64), nullable=True),
    sa.Column('Accucast_code', sa.String(length=64), nullable=True),
    sa.Column('description', sa.String(length=64), nullable=True),
    sa.Column('avg_weight', sa.Integer(), nullable=True),
    sa.Column('submitter_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['submitter_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('Vulcan_style_code')
    )
    op.create_index(op.f('ix_cast_iron_id'), 'cast_iron', ['id'], unique=False)
    op.create_table('roundpipe',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('material', sa.String(length=32), nullable=False),
    sa.Column('inner_diameter', sa.Float(precision=2), nullable=False),
    sa.Column('outer_diameter', sa.Float(precision=2), nullable=False),
    sa.Column('submitter_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['submitter_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_roundpipe_id'), 'roundpipe', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_roundpipe_id'), table_name='roundpipe')
    op.drop_table('roundpipe')
    op.drop_index(op.f('ix_cast_iron_id'), table_name='cast_iron')
    op.drop_table('cast_iron')
    op.drop_index(op.f('ix_user_id'), table_name='user')
    op.drop_index(op.f('ix_user_email'), table_name='user')
    op.drop_table('user')
    op.drop_index(op.f('ix_address_id'), table_name='address')
    op.drop_table('address')
    # ### end Alembic commands ###
