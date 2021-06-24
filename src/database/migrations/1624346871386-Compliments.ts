import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Compliments1624346871386 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'compliments',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true
                },
                {
                    name: 'user_sender',
                    type: 'varchar'
                },
                {
                    name: 'user_receiver',
                    type: 'varchar'
                },
                {
                    name: 'tag_id',
                    type: 'varchar'
                },
                {
                    name: 'message',
                    type: 'varchar'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'UserSender',
                    columnNames: ['user_sender'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                {
                    name: 'UserReceiver',
                    columnNames: ['user_receiver'],
                    referencedTableName: 'user',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                {
                    name: 'Tag',
                    columnNames: ['tag_id'],
                    referencedTableName: 'tag',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('compliments')
    }
}
